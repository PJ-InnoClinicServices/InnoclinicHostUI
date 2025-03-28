import * as React from 'react';

type TopNavbarItemProps = {
    text: string;
};
export const TopNavbarItem = (props: TopNavbarItemProps) => {
    return (
        <div className="font-semibold text-xl transition-all duration-300 hover:text-gray-500 cursor-pointer">
            {props.text}
        </div>
    );
};