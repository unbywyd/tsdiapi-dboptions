# **@tsdiapi/dboptions: Database Options Plugin for TSDIAPI-Server**  

**@tsdiapi/dboptions** extends **TSDIAPI-Server** with dynamic database options, integrating seamlessly with **Prisma**. It enables storing and managing configuration settings in a database with optional DTO transformation and authentication control.

---

## Features  

- **Prisma Integration**: Automatically adds a `DbOption` model for storing key-value configurations.  
- **Dynamic API Routes**: Provides endpoints for managing database options.  
- **DTO Support**: Optionally transform database-stored values using a DTO.  
- **JWT Authentication**: Secure access using a custom **adminGuard** function.  
- **Auto-Registration**: Automatically integrates controllers when enabled.  
- **Feature Generator**: Allows custom entity names for full control over the setup.  

---

## Installation  

```bash
npm install @tsdiapi/dboptions
```  

Or use the CLI to add the plugin:  

```bash
tsdiapi plugins add dboptions
```

---

## Usage  

### Register the Plugin  

Add the plugin to your **TSDIAPI-Server** setup:  

```typescript
import { createApp } from "@tsdiapi/server";
import DboptionsPlugin from "@tsdiapi/dboptions";
import TsdiapiPrismaPlugin from "@tsdiapi/prisma";
import { isJWTValid } from "@tsdiapi/jwt-auth";
import { Dboptions } from "./dboptions.config";

createApp({
  plugins: [
    DboptionsPlugin({
      configDTO: Dboptions, // DTO for structuring option values
      adminGuard: async (req) => {
        const session = await isJWTValid<any>(req);
        if (!session) {
          return false;
        }
        return session.isAdmin; // Allow only admins
      }
    }),
    TsdiapiPrismaPlugin()
  ]
});
```  

---

## Configuration Options  

| Option        | Type      | Default | Description |
|--------------|----------|---------|-------------|
| `configDTO`  | `Class`  | `null`  | DTO for transforming option values before storing or retrieving them. |
| `adminGuard` | `Function` | `null` | Custom function to validate Bearer authentication. |

---

## Auto-Registration  

If **DBOPTIONS_AUTO_REGISTER_CONTROLLERS** is enabled, the plugin:  
- Adds the `DbOption` model to **Prisma** schema.  
- Automatically registers API controllers for managing options.  

To **disable auto-registration**, use:  

```json
{
  "DBOPTIONS_AUTO_REGISTER_CONTROLLERS": false
}
```

For **manual setup**, use the **feature generator** to create a custom entity:  

```bash
tsdiapi generate dboptions feature
```

This allows defining a custom database model and gaining full control over API behavior.

---

## Summary  

The **@tsdiapi/dboptions** plugin extends **TSDIAPI** with a database-driven configuration system. It supports Prisma, DTO-based transformations, and flexible authentication control. Use **auto-registration** for quick setup or **manual generation** for advanced customization. 🚀