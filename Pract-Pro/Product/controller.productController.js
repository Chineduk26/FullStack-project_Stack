const productService= require('./service.productService')


export.createProduct= async(req,res)=>{
 try{
    const product=  await productService.createProduct(req.body);
res.status(200).json({message:"product created",product});
 }catch(error){
    res.status(500).json({error:error.message})
 }
 
}
export.getProducts= async(req,res)={
try{
    const productView= await productService.getProduct(req.body.id);
res.status(201).json({message:"data return",productView})
}catch(error){
    res.status(500).json({error:error.message});
}
}
