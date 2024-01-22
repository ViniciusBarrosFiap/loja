/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProductController } from "./produto.controller";
import { ProductRepository } from "./produto.repository";

@Module({
    controllers:[ProductController],
    providers:[ProductRepository]
})
export class ProductModule{}