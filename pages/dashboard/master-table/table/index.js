import React, { useState,useEffect, useCallback, useRef } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import NodataPage from '@/components/molecules/nodataPage'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { SampleTableNew } from '@/components/organism/tablecomp'
import DialogPage from '@/components/molecules/dialog'
import { CustomSelect,Text1 } from '@/components/atoms/field'
import masterTableApi from 'helpers/use-api/master-table/table'
import { MasterTableLogs } from '@/components/organism/tablecomp'
import { MasterTableStructure } from 'proj-components/Dashboard/masterTable/modifytable'
import Debounce from 'helpers/debounce'

const ModifyTableCall =({open,onClose,data})=>{
     const [list,setList] = useState(data)
     const [selectedTable,setSelectedTable ] = useState(null)
     const [page,setPage] = useState()

     const handleSubmit =()=>{
       const a = '/dashboard/master-table/table/modify?'
       if(selectedTable !== null && selectedTable !== ''){
        window.location.href=a+`id=${selectedTable}`;
        // alert(`${a}${selectedTable}`)
        }
     }

  return (
    <DialogPage width='min-w-[510px]' open={open} close={onClose}>
     <div className='space-y-4'>
        <Text1 className='text-center' size='2xl' color='text-primary'>Modify Master Table</Text1>
       
        <CustomSelect label={'Table type'} onChange={(e)=>setSelectedTable(e.target.value)}>
          <option value={''}>select</option>
         {list.map((cur)=>{
          return <option key={cur._id} value={cur._id}>{cur.tableName}</option>
         })}
        </CustomSelect>

        <div className='text-center'>
        <Button variant='contained' onClick={handleSubmit}>MODIFY</Button>
        </div>
       {/* {JSON.stringify(list)} */}
     </div>
   </DialogPage>
  )
}

const header = [
  {label:"Master Table Id",name:"tableCodeId"},
  {label:"Master Table Name",name:"tableName"},
  {label:'Updated by', name:"createdBy"},
  {label:'Update on', name:"createdAt"},
  {label:'Status/Action', name:"action"},
]

const Page = ({access_token,user,tables,draftTable,structureTable}) => {
    const [list,setList] = useState(tables)
    const [tableList,setTableList] = useState(tables?.data)
    const [checkedNewData, setCheckedNewData] = useState([]);
    const [allClick, setAllClick] = useState(false);
    const [isOpen,setIsOpen] = useState(false)
    const [page,setPage] = useState(tables?.currentPage)
    const [pageSize,setPageSize] = useState(10)
    const [activeTab,setActiveTab] = useState('ALL Master Table')
    const [sort,setSort] = useState({"createdAt":-1})
    const tabList = ["ALL Master Table","Table Structures","Drafts"]
    const isMounted = useRef(false)
    
    let publishStatus = "published"
    const router = useRouter()
    const Header = [
      {label:"Master Table Id",name:"tableCodeId"},
      {label:"Master Table Name",name:"tableName"},
      {label:"Application to",name:"applicableTo"},
      {label:"Created on",name:"createdAt"},
      {label:"Created by",name:"createdBy"},
    ]
    const HeaderBody =[
      {_id:"1234",master_table:"Table 01", master_name:"IT Act",aplicable:"all",createdAt:'1/2/2023',user:'john'},
      {_id:"1236",master_table:"Table 02", master_name:"Company Act",aplicable:"all",createdAt:'1/21/2023',user:'jack'}
    ]
    const handleSubmit = ()=>{


    }
    const clickAll = () => {
      setAllClick(!allClick);
    };
    
    useEffect(() => {
      if (allClick === true) {
        setCheckedNewData(tableList);
      } else {
        setCheckedNewData([]);
      }
    }, [allClick]);

    const onNewCheck = (data) => {
      // console.log(data,'data')
      const exist = checkedNewData.find((element) => element._id === data._id);
      console.log(exist, "exit");
      if (exist) {
        setCheckedNewData(
          checkedNewData.filter((single) => single._id !== data._id)
        );
      } else {
        setCheckedNewData([...checkedNewData, data]);
      }
    };

    const callApi = useCallback(async(e)=>{
      // console.log('call Api',e)

      const res = await masterTableApi.allTable(access_token,e.page,e.pageSize,JSON.stringify(sort),publishStatus)
      // console.log(res,'res',e.page,pageSize)
      setList(res.data)
      setTableList(res?.data?.data)
      setPage(res.data.currentPage)
     
    },[])
    const handleSearchChange=Debounce(callApi
      ,1000)

    const handlePage =(e)=>{
      let value = e
      // console.log(pageSize,'handlePage')
      handleSearchChange({page:value,pageSize:pageSize})
       setPage(value)
    }

    const onPageSize = useCallback(async(e)=>{
      setPageSize(Number(e.target.value))
      const res = await masterTableApi.allTable(access_token,page,e.target.value,JSON.stringify(sort),publishStatus)
      console.log(res,page,pageSize,'list')
      setList(res.data)
      setTableList(res?.data?.data)
      setPage(res.data.currentPage)
      //  console.log(e.target.value,'onPageSoze',res)
    },[])

    useEffect(()=>{

      if(isMounted.current){

        if(activeTab=== "ALL Master Table"){
        // console.log(activeTab,tables)
        setTableList(tables?.data)
        setPage(tables.currentPage)
        }
        if(activeTab=== "Table Structures"){
          // console.log(structureTable,activeTab)
          setTableList(structureTable?.data)
          setPage(structureTable.currentPage)
        }
        if(activeTab=== "Drafts"){
          // console.log(draftTable,activeTab)
          setTableList(draftTable?.data)
          setPage(draftTable.currentPage)
        }
      }

      return ()=>{
        isMounted.current = true
      }
      
    },[activeTab])

    // console.log(draftTable,'list',structureTable)
  const publishDraftTable = async(id)=>{
      // alert(id)
      try{
         const res =   await masterTableApi.publishDraftTable(access_token,id)
          console.log(res,'res')
      }catch(err){
        console.log(err,'err');
      }
     
  }
  return (
    <>
        <MainLayout User={user} isScroll={true}>
        <div className=''>
        {/* HEADER SECTION */}
         <div className='flex justify-between items-center'>
          <div>
            <Text1 size='2xl'>All Master Tables</Text1>
            <Text1 className='text-lightGray' size='sm'>We have nothing here yet. Start by adding a Field Group.</Text1>
          </div>
          <div className='flex gap-4'>
            <Button variant='contained' onClick={()=>router.push('/dashboard/master-table/table/add-table')}>Create New</Button>
            {/* <Button onClick={()=> setIsOpen(true)}>MODIFY MASTER TABLE</Button> */}
          </div>
         </div>
         
         {checkedNewData.length > 0 && <div className='bg-slate-100 py-4 px-4 mt-4'>
                 <Text1>{`${checkedNewData.length} has been selected for export csv`}</Text1>
               
              </div> }

              <div className='flex my-4 gap-4'>{tabList.map((tab,index)=>{
                return <p className={`${activeTab === tab ? "underline decoration-primary underline-offset-2 text-primary":""} cursor-pointer`} onClick={()=> setActiveTab(tab)} key={index}>{tab}</p>
              })}</div>

              {activeTab === "ALL Master Table" && <div>
                     {tableList.length === 0 ?   <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/> :<div className=''>
          <SampleTableNew
                  response={tableList}
                  headerData={[{ name: "check", label: "" }, ...Header]}
                  checkedData={checkedNewData}
                  responseData={(e) => onNewCheck(e)}
                  clickAll={clickAll}
                  href={`/dashboard/master-table/table/published?`}
                  onClick={(e) => console.log(e, "onclick")}
                  checkAllStatus={allClick}
                  totalDoc={list?.totalDocuments}
                  currentPage={page}
                  start={list.startSerialNumber}
                  end={list.endSerialNumber}
                  pageSize={list?.totalPages}
                 onPageChange={handlePage}
                 onPageSize = {onPageSize}
                />
          </div>}
              </div>}

              {/* TABLE STRUCTURE */}
              {activeTab === "Table Structures" && <div>
                  
              {tableList.length  === 0 ? <NodataPage/> :<div>
                <MasterTableStructure 
                  response={tableList}
                  headerData={header}
                  href={'/dashboard/master-table/table/single?'}
                  responseData={(e) => onNewCheck(e)}
                  onClick={(e)=> console.log(e,'onclick') }
                  totalDoc={structureTable?.totalDocuments}
                  currentPage={page}
                  start={structureTable.startSerialNumber}
                  end={structureTable.endSerialNumber}
                  pageSize={structureTable?.totalPages}
                 onPageChange={handlePage}
                 onPageSize = {onPageSize}
                 publishCall={(e)=> alert(e)}
              //  onDelete={(e)=> console.log(e,'delete')}
              //  onEdit={(e)=> console.log(e)}
                   />
                </div>}
              </div>}
              {activeTab === "Drafts" && <div>
                  {tableList.length  === 0 ? <NodataPage/> :<div>
                    <MasterTableLogs 
                      response={tableList}
                      headerData={header}
                      href={'/dashboard/master-table/table/single?'}
                      responseData={(e) => onNewCheck(e)}
                      onClick={(e)=> console.log(e,'onclick') }
                      totalDoc={draftTable?.totalDocuments}
                      currentPage={page}
                      start={draftTable.startSerialNumber}
                      end={draftTable.endSerialNumber}
                      pageSize={draftTable?.totalPages}
                    onPageChange={handlePage}
                    onPageSize = {onPageSize}
                    publishCall={publishDraftTable}
                  //  onDelete={(e)=> console.log(e,'delete')}
                  //  onEdit={(e)=> console.log(e)}
                      />
                    </div>}
              </div>}
              
            {/* <ModifyTableCall open={isOpen} onClose={()=> setIsOpen(!isOpen)} data={tableList}/> */}
         </div>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
     
    let page = 1
    let pageSize = 10
    let sort = {"createdAt":-1};
    let publishStatus = "published"
    let publishStatus1 = "unpublished"
    let table 
    let table1
    let structureTable
    let auth
    try{
       auth =await authApi.WhoAmI(appCtx)
      if (!auth) {
        return {
          redirect: {
            destination: '/auth/login',
            permanent: false,
          },
        };
      } 
      const {data} = await masterTableApi.allTable(access_token,page,pageSize,JSON.stringify(sort),publishStatus)
      const {data:data1} = await masterTableApi.allTable(access_token,page,pageSize,JSON.stringify(sort),publishStatus1)
      const {data:data2} = await masterTableApi.tableStructue(access_token,page,pageSize,JSON.stringify(sort))
      table1 = data1
      table  =  data
      structureTable = data2
      // console.log(data)
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth || {},
         access_token,
         tables:table||[],
         draftTable:table1,
         structureTable:structureTable

      }
    }
  
  }

export default Page
