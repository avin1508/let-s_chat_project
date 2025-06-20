import { BaseToast, ErrorToast } from "react-native-toast-message";
import colors from "../Constants/Theme";


export const toastConfig = {
    success: ( props ) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: colors.success }}
            text1Style={{ fontSize: 15, fontWeight: 'bold' }}
        />
    ),
    error: ( props ) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: colors.error }}
            text1Style={{ fontSize: 15, fontWeight: 'bold' }}
        />
    ),
}