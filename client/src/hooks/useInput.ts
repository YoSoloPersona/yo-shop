import React, { useState } from 'react';

export const useInput = (init: string) => {
    const [ value, setValue ] = useState(init);

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return { value, onChange };
}