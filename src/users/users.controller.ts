import { Get, Body, Post, Put, Delete, Param, Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly user_svce: UsersService){}

    /**
     * Get All data from user
     */
    @Get()
    async findAll(){
        try {
            return this.user_svce.findAll();
            
        } catch (error) {
            throw error
        }
    }

    /**
     * Login user 
     * @param body 
     * @returns 
     */
    @Post()
    async loginUser(@Body() body:{email :string, password: string}){
        return this.user_svce.findOne(body.password, body.email);
    }

    /**
     * Insert new data for user
     * @param body 
     * @returns 
     */
    
    @Post()
    async createUser(@Body() body:{ email: string, name: string, password: string }){
        try {
            return this.user_svce.createUser(body.email, body.name, body.password);
        } catch (error) {
            throw error
        }
    }
    
    /**
     * Update data for user
     * @param id 
     * @param body 
     * @returns 
     */
    
    @Put()
    async updateUser(@Param('id') id: number, @Body() body: { email:string, name:string, password: string }) {
        try {
            return this.user_svce.updateUser(id, body.email, body.name, body.password)
        } catch (error) {
            throw error
        }
    }
    /**
     * Delete user
     * @param id 
     * @returns 
     */
    
    @Delete()
    async deleteUser(@Param('id') id: number){
        try {
            return this.user_svce.deleteUser(id);
        } catch (error) {
            throw error
        }
    }


}
