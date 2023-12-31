import React, { useState ,useCallback} from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
// import { LeftArrowIcon } from '@/components/atoms/icons'
import { Text1 } from '@/components/atoms/field'
// import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { MasterTableLogs } from '@/components/organism/tablecomp'
import masterTableApi from 'helpers/use-api/master-table/table'
import NodataPage from '@/components/molecules/nodataPage'
import Debounce from 'helpers/debounce'

const LogTable = ({user,access_token,tables}) => {
  const [list,setList] = useState(tables)
  const [tablesList,setTablesList] = useState(tables.data)
  const [page,setPage] = useState(tables.currentPage)
  const [pageSize,setPageSize] = useState(10)
  const [sort,setSort] = useState({"createdAt":-1})
    const router= useRouter()
    const header = [
      {label:"Master Table Id",name:"tableCodeId"},
      {label:"Master Table Name",name:"tableName"},
      {label:'Updated by', name:"createdBy"},
      {label:'Update on', name:"createdAt"},
      {label:'Status/Action', name:"action"},
    ]

    const headerBody = [
      {_id:"1234",table_id:'Table01',table_name:'Company Act',updated:"admin", createdAt:'1/2/2023',status:false},
      {_id:"1431",table_id:'Table02',table_name:'IT Act',updated:"Root", createdAt:'1/3/2023',status:true}
    ]

    const handleSubmit = ()=>{

    }


    const callApi = useCallback(async(e)=>{
      // console.log('call Api',e)

      const res = await masterTableApi.allTable(access_token,e.page,e.pageSize,JSON.stringify(sort))
      // console.log(res,'res')
      setList(res.data)
      setTablesList(res?.data?.data)
      setPage(res.data.currentPage)
     
    },[])
    const handleSearchChange=Debounce(callApi
      ,2000)

    const handlePage =(e)=>{
      let value = e
      handleSearchChange({page:value,pageSize:pageSize})
       setPage(value)
    }

    const onPageSize = useCallback(async(e)=>{
      setPageSize(e.target.value)
      const res = await masterTableApi.allTable(access_token,page,e.target.value,JSON.stringify(sort))
      setList(res.data)
      setTablesList(res?.data?.data)
      setPage(res.data.currentPage)
      //  console.log(e.target.value,'onPageSoze',res)
    },[])

  return (
      <>
        <MainLayout User={user} isScroll={true}>
            <div>
                {/* HEADER SECTION */}
                <div className="w-full flex justify-between items-center space-y-2">
                        <div>
                        <div className="flex items-center cursor-pointer" >
                            
                           
                        </div>
                        <Text1 weight='' size="2xl" > Master Table Logs & Draft  </Text1>
                        <Text1  size="sm">We have nothing here yet. Start by adding an Organization.</Text1>
                        </div>
                        {/* <Button href={'/dashboard/master-table/table/upload'} variant="contained" onClick={handleSubmit}>NEXT</Button> */}
                </div>
                {/* {checkData} */}
                <div>
                {tablesList.length  === 0 ? <NodataPage/> :<div>
                <MasterTableLogs 
                  response={tablesList}
                  headerData={header}
                  href={'/dashboard/master-table/logs/single?'}
                  responseData={(e) => onNewCheck(e)}
                  onClick={(e)=> console.log(e,'onclick') }
                  totalDoc={list?.totalDocuments}
                  currentPage={page}
                  start={list.startSerialNumber}
                  end={list.endSerialNumber}
                  pageSize={list?.totalPages}
                 onPageChange={handlePage}
                 onPageSize = {onPageSize}
                 publishCall={(e)=> alert(e)}
              //  onDelete={(e)=> console.log(e,'delete')}
              //  onEdit={(e)=> console.log(e)}
                   />
                </div>}
                </div>
            </div>
        </MainLayout>
      </>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
    const auth =await authApi.WhoAmI(appCtx)
    // console.log(auth,'ddd')
    if (!auth) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    } 
  
    let page = 1
    let pageSize = 10
    let sort = {"createdAt":-1};
    let tables
    try{
      const {data} = await masterTableApi.allTable(access_token,page,pageSize,JSON.stringify(sort))
      tables  =  data
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth,
         access_token,
         tables:tables||[]
      }
    }
  
  }

export default LogTable
