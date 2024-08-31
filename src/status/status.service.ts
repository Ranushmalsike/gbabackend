import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class StatusService {
  constructor(private readonly prs: PrismaService) {}
    /**
     * 
     * @returns form status tb data
     */
    async findAll(): Promise<any> {
        return this.prs.statusTB.findMany(); // Accessing the statusTB model
    }
    /**
     * insert data for status
     * @param status 
     * @returns 
     */
    async createStatus(status:string): Promise<any>{
        return this.prs.statusTB.create({
            data: {
                status,
            },
        })
    }

    /**
     * Update status data
     * @param id 
     * @param status 
     * @returns 
     */
    async updateStatus(id: number, status:string): Promise<any>{
        return this.prs.statusTB.update({
            where : { id },
            data :{status}
        })
    }
    /**
     * Delete Status
     * @param id 
     * @returns 
     */
    async deleteStatus(id : number): Promise<any>{
        return this.prs.statusTB.delete({
            where : { id }
        })
    }

}
