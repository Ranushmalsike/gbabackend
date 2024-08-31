import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class BusinessTypesService {
    constructor (private readonly prs: PrismaService){}
    
    /**
     * get all data
     * @returns 
     */
    async findAll(): Promise<any>{
        return this.prs.business_types.findMany();
    }
    
    /**
     * Insert Data
     * @param business 
     * @param startDate 
     * @param statusTBid 
     * @returns 
     */
    async addData(business: string, startDate: Date, statusTBid:number ): Promise<any>{
        return this.prs.business_types.create({
            data: {
                business,
                startDate,
                statusTBid
            }
        })
    }

    /**
     * Update data
     * @param id 
     * @param business 
     * @param startDate 
     * @param statusTBid 
     * @returns 
     */
    async updateData(id: number, business: string, startDate: Date, statusTBid: number): Promise<any>{
        return this.prs.business_types.update({
            where : { id },
             data:  {business, startDate, statusTBid }
        })
    }
    
    /**
     * Delete data
     * @param id 
     * @returns 
     */
    async deleteData(id: number): Promise<any>{
        return this.prs.business_types.delete({
            where: { id }
        })
    }

}
