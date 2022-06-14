import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { commonActions } from "../store/common";


const useValidateMode = () => {
    const dispatch = useDispatch();
    const validateMode = useSelector((state:any) => state.common.vallidateMode);

    const setValidateMode = (value:boolean) => 
        dispatch(commonActions.setValidateMode(value));

    return { validateMode, setValidateMode};
}

export default useValidateMode;