import { Module } from "@nestjs/common";
import { AdminModule } from "@adminjs/nestjs";
import { ConfigModule } from "@nestjs/config";
import AdminJS from "adminjs";
import mongoose from "mongoose";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
// import { Category } from './schema/category.schema.js';
import { Users } from "./schema/users.schema.js";
import * as AdminJSMongoose from "@adminjs/mongoose";

import { ServeStaticModule } from "@nestjs/serve-static";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const anotherFile = new URL("*", import.meta.url);
const __filename = fileURLToPath(anotherFile);
const __dirname = dirname(__filename);

// Uncomment for login feature.
// const DEFAULT_ADMIN = {
//   email: 'xyz@mail.in',
//   password: 'admin',
// };

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"), // Adjust the path as needed
    }),
    AdminModule.createAdminAsync({
      useFactory: async () => {
        const options = {
          connectionString: process.env.DATABASE_URL,
        };
        await mongoose.connect(options.connectionString);

        return {
          adminJsOptions: {
            rootPath: "/admin",
            // Rename "organizations" to your table name or set "resources" to []
            branding: {
              companyName: "Your Brand Name",
              softwareBrothers: true,
              // logo: '/alternateLogo.png',
            },
            resources: [Users],
          },
          // Uncomment for login to work
          // auth: {
          //   authenticate: async (email: string, password: string) => {
          //     if (
          //       email === DEFAULT_ADMIN.email &&
          //       password === DEFAULT_ADMIN.password
          //     ) {
          //       return Promise.resolve(DEFAULT_ADMIN);
          //     }
          //     return null;
          //   },
          //   cookiePassword: 'secret',
          //   cookieName: 'adminjs',
          // },
          // sessionOptions: {
          //   resave: true,
          //   saveUninitialized: true,
          //   secret: 'secret',
          // },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
