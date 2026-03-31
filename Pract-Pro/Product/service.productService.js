const product=require('./model.productService')
const {op}=require('sequelize')

export.createProduct=async(data)=>{
    if(stock <0){
        throw new Error('not empty')
    }
    return await product.create(data)
}
export getProduct= async(data)=>{
    const {page =1,limit,minPrice,maxPrice,search}=data;
    const offset=(page-1)*limit;
    let whereClause={isDelected:false}
    if(minPrice && maxPrice){
        whereClause.price={
            [op.between]:[minPrice, maxPrice]
        }
    }
    if(search){
        whereClause.name={
            [op.like]:`%${search}%`;
        }
    }
    const {count, row}= await product.findAndCount(
        {
            where:whereClause,
            limit:parseInt(limit),
            offset:parseInt(offset)
        }
    )
    return {
        data, pagination:{
            totalItem:parseInt(page),
            currentPage:parseInt(page),
            totalPage:math.cell(count/limit)
        }
    } 
}