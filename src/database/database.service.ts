import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    private isConnected = true;

    onModuleInit(){
        console.log('Database Connected!');
    }

    onApplicationShutdown(signal: string){
        this.isConnected = false;
        console.log(`Database Disconnected duw to app shutdown.  Signal ${signal}`);
    }

    getStatus(){
        return this.isConnected ? 'Connected' : 'DisConnected';
    }
}
