import { Controller, Get, Put, Post, Param, Body, Delete } from '@nestjs/common';
import { BusinessTypesService } from './business_types.service';
import { throwError } from 'rxjs';

@Controller('business-types')
export class BusinessTypesController {
    constructor (private readonly businesType: BusinessTypesService){}
    /**
     * get all data from business
     * @returns 
     */
    @Get()
    async findAll(){
        try {
            return this.businesType.findAll(); 
            
        } catch (error) {
            throw error
        }
    }
    
    /**
     * Insert data 
     * @param body 
     * @returns 
     */

    @Post()
    async insertData(@Body() body: { business: string, startDate: Date, statusTBid: number }){
            try {
                return this.businesType.addData(body.business, body.startDate, body.statusTBid);
                
            } catch (error) {
                throw error
            }
    }

    /**
     * Update data
     * @param id 
     * @param body 
     * @returns 
     */

    @Put('id')
    async updateData(@Param() id: number, @Body() body: { business: string, startDate: Date, statusTBID: number}){
        try {
            return this.businesType.updateData(id, body.business, body.startDate, body.statusTBID);
        } catch (error) {
            throw error
        }
    }

    /**
     * Delete data
     * @param id 
     * @returns 
     */
    @Delete()
    async deleteData(@Param() id: number){
        try {
            return this.businesType.deleteData(id);
        } catch (error) {
            throw error
        }
    }

}
