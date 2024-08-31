import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { NormalOrDryTbService } from './normal-or-dry_tb.service';

@Controller('normal-or-dry-tb')
export class NormalOrDryTbController {
    constructor (private readonly nmdrY: NormalOrDryTbService){}
    
    /**
     * Find All data
     * @returns 
     */
    @Get()
    async findAll(){
        try {
            return this.nmdrY.findAll()
            
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
    async insertdata(@Body() body: {item: string}){
        try {
            return this.nmdrY.createData(body.item);
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
    @Put()
    async updateData(@Param('id') id: number, @Body() body: { item: string}){
        try {
            return this.nmdrY.updateData(id, body.item)
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
    async deleteData(@Param('id') id: number){
        try {
            return this.nmdrY.deleteData(id)
        } catch (error) {
            throw error
        }
    }

}
