const errorResponse=require('../utils/errorResponse');
const asyncHandler=require('../middlewares/async');
const Book = require('../models/Books');
//@desc         get all books
//@url          GET /
//@access       public
exports.getAllBooks = async (req, res) => {
    // blank query for async query
    let query;
    // copy the query for filtering works
    let queryStr={... req.query};
    // a variable for filtering fields to remove from copy of query
    const removeFields=['select','sort','page','limit'];
    // remove fields from query copy
    removeFields.forEach(item=>delete queryStr[item]);
    let bodysigns=JSON.stringify(queryStr);
    bodysigns=bodysigns.replace(/\b(gt|lt|lte|gte|in)\b/g,match=> `$${match}` );
    query=Book.find(JSON.parse(bodysigns));
    // Select
    if(req.query.select){
        query.select(req.query.select.split(',').join(" "));
    }
    // Sort
    if(req.query.sort){
        query.sort(req.query.sort.split(',').join(" "));
    }
    // pagination variable and calculation
    const page=parseInt(req.query.page ,10)||1;
    const limit=parseInt(req.query.limit , 10)||3;
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;
    query=query.skip(startIndex).limit(limit);
    const counter=await Book.countDocuments();
    let pagination={};
    // Pagination 
    if (startIndex>0){
        pagination.perv=page-1;
    }
    if(endIndex<counter){
        pagination.next=page+1;
    }
    // Execute query
    const _retAllBooks = await query;
    res.status(200).json({ status: true, count:_retAllBooks.length,pagination, data: _retAllBooks });
}
//@desc         create new book
//@url          POST /
//@access       private
exports.createBook = asyncHandler(async (req, res, next) => {
        const _retCreatedBook = await Book.create(req.body);
        res.status(201).json({
            status: true
            , data: _retCreatedBook
        });


});
//@desc         get a book with id
//@url          POST /:id
//@access       public
exports.getBook = asyncHandler(async (req, res, next) => {
        const _retBook = await Book.findById(req.params.id);
        
        if(!_retBook){
            next(new errorResponse(`cant find any data about Book id of ${req.params.id}`,404));
            // return;
        }else{
            res.status(200).json({
                status: true
                , data: _retBook
            });
        }

});
//@desc         update existing book
//@url          POST /:id
//@access       private
exports.updateBook = asyncHandler(async (req, res, next) => {
        const _retUpdatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
       
        res.status(201).json({
            status: true
            , data: _retUpdatedBook
        });

});
//@desc         remove a book
//@url          POST /:id
//@access       private
exports.deleteBook = asyncHandler(async (req, res, next) => {
        const _retDeletedBook = await Book.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: true
            , data: _retDeletedBook
        });

});