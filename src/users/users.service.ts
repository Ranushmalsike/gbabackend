import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { hashPassword, comparePassword } from './password.utils'

@Injectable()
export class UsersService {
    constructor (private readonly prs:PrismaService){}
    
    /**
     * find all data from user 
     * @returns 
     */
    async findAll(): Promise<any>{
        return this.prs.user.findMany();
    }

    /**
     * insert new data into user
     * @param email 
     * @param name 
     * @param password 
     * @returns 
     */
    async createUser(email: string, name: string, password: string): Promise<any>{
        return this.prs.user.create({
            data: {
            email,
            name,
            password
            }
        })
    }

    /**
     * Update user
     * @param id 
     * @param email 
     * @param name 
     * @param password 
     * @returns 
     */
    async updateUser(id: number, email:string, name: string, password: string): Promise<any>{

        const Pass = await hashPassword(password);
        return this.prs.user.update({
            where : {id},
            data : { email, name, password: Pass }
        })
    }

    /**
     * Delete user
     * @param id 
     * @returns 
     */
    async deleteUser(id: number): Promise<any>{
        return this.prs.user.delete({
            where: {id}
        })
    }
}
