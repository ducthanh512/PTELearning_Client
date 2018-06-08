import * as questioncodes from './../../constants/QuestionCodes';
var _ = require('lodash');


export default function getCategoryName (category){
    const  codes = questioncodes.questioncodes;
    var categoryName = "";
    var keys = _.keys(codes);
    var values = _.values(codes)
    var codeIndex = keys.findIndex((key)=>key === category.code)
    if(codeIndex!=-1){categoryName = values[codeIndex]}
    return categoryName;
};

