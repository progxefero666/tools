//src\app\api\projects\dbconnection.ts

import { PrismaClient } from "@prisma/client"


/**
 * class DatabaseConnection
 */
export class DatabaseConnection {
    
    private static instance: PrismaClient
    private static connected: boolean = false

    public static async getConnection(): Promise<PrismaClient> {
        if (!this.instance) {
            // Validar variable de entorno
            if (!process.env.DATABASE_URL) {
                throw new Error('DATABASE_URL no definida en .env')
            }
            this.instance = new PrismaClient({
                datasources: {
                    db: {
                        url: process.env.DATABASE_URL
                    }
                },
                log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error']
            })
            await this.connect()
        }
        return this.instance
    }

    private static async connect(): Promise<void> {
        try {
            await this.instance.$connect()
            this.connected = true
            console.log('BD conectada:', process.env.DB_NAME)
        } 
        catch (error) {
            throw new Error(`Error BD: ${error}`)
        }
    }

    public static async disconnect(): Promise<void> {
        if (this.instance) {
            await this.instance.$disconnect()
            this.connected = false
        }
    }

}//end class
