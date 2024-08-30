import { Get, Body, Post, Put, Delete, Param, Controller } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
    constructor (private readonly status:StatusService){}
    /**
     * 
     * @returns form status all data
     */
    @Get()
    async findALl(){
        try {
            return this.status.findAll();
            
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Insert new status value 
     * @param body - The new status value
     * @returns 
     */
    @Post()
    async createStatus(@Body() body: { status: string }) {
        try {
            return this.status.createStatus(body.status);
            
        } catch (error) {
            throw error
        }
    }
    /**
     * Update status 
     * @param id 
     * @param body 
     * @returns 
     */
    @Put()
    async updateStatus(@Param('id') id: number, @Body() body : { status: string }){
        try {
            return this.status.updateStatus(id, body.status);
            
        } catch (error) {
            throw error
        }
    }

    @Delete()
    async deleteStatus(@Param('id') id : number){
        try {
            return this.status.deleteStatus(id);
        } catch (error) {
            throw error
        }

    }


}
