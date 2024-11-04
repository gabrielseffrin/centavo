import React from "react";
import { Text, TextProps } from "react-native";

type CustomTextProps = TextProps & {
    children: React.ReactNode;
};




export default function CustomText({ children, style, ...props }: CustomTextProps) {

    return (
        
        <Text
            style={[{fontFamily: 'MontserratAlternates_400Regular'}, style]}
        >
            {children}
        </Text>
    );
}