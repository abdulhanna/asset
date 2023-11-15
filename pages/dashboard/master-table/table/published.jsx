import React,{useState,useRef,useEffect} from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import masterTableApi from 'helpers/use-api/master-table/table'
import { MasterTableComponent } from '@/components/organism/tablecomp'
import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
import Button from '@/components/atoms/button'
import { DeleteConfirm } from '@/components/molecules/dialog'
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router'
const PublishedTable = ({user,access_token,table}) => {
    const[masteTable,setMasterTable] = useState(table.masterTableData)
    const [tableHeader,setTableHeader] = useState(table?.masterTableHeader)
    const [isDelete,setIsDelete] = useState(false)
    const router  = useRouter()
    const element = useRef(false)
    const {id} = router.query
    const notify = (msg)=> toast.success(msg)
    const Error = (msg)=> toast.error(msg)

    const callDelete = async()=>{
        // alert('delete')
  
        try{
           const res = await masterTableApi.removeTableById(access_token,id)
           console.log(res,'res')
           if(res.status == '200'){
            notify('table deleted')
           }
           setTimeout(()=>{
                   router.push('/dashboard/master-table/table')  
           },2000)
          
        }catch(err){
          Error(err?.response?.data?.error)
          console.log(err,'err')
        }
      }

  return (<>
    <MainLayout User={user}>
       <div>
            <div className="w-full flex justify-between items-center">
                    <div>
                    <div className="flex items-center cursor-pointer" onClick={()=> router.back()}>
                                <LeftArrowIcon />
                                <Text1 weight='' size="2xl" >
                               {table?.tableName}
                                </Text1>
                            </div>
                            <Text1 className="pl-4" size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
                    </div>
                    {  <div className='flex gap-4'>
                 
                        <Button variant='danger' onClick={()=>setIsDelete(true)}>DELETE</Button>
                       
                    </div>}
                    
                    
            </div>
            <div>
                <MasterTableComponent
                    headers={tableHeader}
                responseData={(e,id) =>{
                // setRow(e)
                // setSelectedId(id)
                }}
                body={masteTable?.map((item) => {
                return {
                ...item,
                // href: `id=${item.id}`,
                   };
                 })}
              onClick={(e)=>console.log(e)}
               />
            </div>
            <DeleteConfirm 
             check={isDelete}
             close={()=> setIsDelete(!isDelete)}
             callDelete={callDelete}
             heading= {'Are sure want to delete Table'}
             para ={'By deleting this master table it will be permanently removed from all the organisations as well.'}
          />
          <ToastContainer/>
       </div>
    </MainLayout>
  </>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    const auth =await authApi.WhoAmI(appCtx)
    // console.log(appCtx.query.id,'ddd')
    let {id} = appCtx.query
    if (!auth) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    } 
  
    let table 
    try{
      const {data} = await masterTableApi.getTable(access_token,id)
      // console.log(data,'data')
      table  =  data
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth,
         access_token,
         table:table||[]
      }
    }
  
  }


export default PublishedTable
