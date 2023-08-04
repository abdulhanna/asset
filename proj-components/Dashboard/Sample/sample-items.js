import {SelectFillIcon,SelectIcon} from '../../../components/atoms/icons'
export const ClickCheckBoxComp = (status)=>{
    return(
        <div className="cursor-pointer">
            {status.status === 'true' ?
                <SelectFillIcon/> :
                status.status === 'false' ?
                    <SelectIcon/>:''
                    
            }
        </div>
    )
}
