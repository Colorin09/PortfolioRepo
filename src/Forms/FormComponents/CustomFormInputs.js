import React from "react";
import {useField, Field} from 'formik';

export const CustomTextInput = ({...props}) =>{
    const [fields, meta] = useField(props);

    return(
        <>
            <input type={"text"} className={"form-control"} {...fields} {...props}/>
            <p>{meta.error? meta.error : null}</p>
        </>
    );
};

