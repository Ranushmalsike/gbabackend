import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';


@Injectable()
export class NormalOrDryTbService {
    constructor (private readonly prs: PrismaService){}

    /**
     * Find All
     * @returns 
     */
    async findAll(): Promise<any>{
        return this.prs.normalOrDry_tb.findMany()
    }

    /**
     * Insert Data
     * @param item 
     * @returns 
     */

    async createData(item: string): Promise<any>{
        return this.prs.normalOrDry_tb.create({
            data: { item }
        })
    }   

    /**
     * Update
     * @param id 
     * @param item 
     * @returns 
     */
    async updateData(id: number, item: string): Promise<any>{
        return this.prs.normalOrDry_tb.update({
            where : { id }, 
            data : { item } 
        })
    }

    /**
     * Delete data
     * @param id 
     * @returns 
     */

    async deleteData(id: number): Promise<any>{
        return this.prs.normalOrDry_tb.delete({
            where: { id }
        })
    }


}
