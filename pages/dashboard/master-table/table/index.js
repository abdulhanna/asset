import React, { useState,useEffect } from 'react'
import MainLayout from 'proj-components/MainLayout'
import authApi from 'helpers/use-api/auth'
import NodataPage from '@/components/molecules/nodataPage'
import Button from '@/components/atoms/button'
import { useRouter } from 'next/router'
import { SampleTableNew } from '@/components/organism/tablecomp'
import DialogPage from '@/components/molecules/dialog'
import { CustomSelect,Text1 } from '@/components/atoms/field'
import masterTableApi from 'helpers/use-api/master-table/table'

const ModifyTableCall =({open,onClose,data})=>{
     const [list,setList] = useState(data)
     const [selectedTable,setSelectedTable ] = useState(null)

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

const Page = ({access_token,user,tables}) => {
    const [tableList,setTableList] = useState(tables?.data)
    const [checkedNewData, setCheckedNewData] = useState([]);
    const [allClick, setAllClick] = useState(false);
    const [isOpen,setIsOpen] = useState(false)
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
        setCheckedNewData(permissionList);
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
    console.log(tables,'list')
  return (
    <>
        <MainLayout User={user} >
        <div className=''>
        {/* HEADER SECTION */}
         <div className='flex justify-between items-center'>
          <div>
            <Text1 size='2xl'>All Master Tables</Text1>
            <Text1 className='text-lightGray' size='sm'>We have nothing here yet. Start by adding a Field Group.</Text1>
          </div>
          <div className='flex gap-4'>
            <Button variant='contained' onClick={()=>router.push('/dashboard/master-table/table/add-table')}>DESIGN MASTER TABLE</Button>
            <Button onClick={()=> setIsOpen(true)}>MODIFY MASTER TABLE</Button>
          </div>
         </div>
          {tableList.length === 0 ?   <NodataPage text={'We have nothing here yet. Start by adding a Location. Know how?'}/> :<div className=''>
          <SampleTableNew
                  response={tableList}
                  headerData={[{ name: "check", label: "" }, ...Header]}
                  checkedData={checkedNewData}
                  responseData={(e) => onNewCheck(e)}
                  clickAll={clickAll}
                  href={`/dashboard/master-table/table/single?`}
                  onClick={(e) => console.log(e, "onclick")}
                  checkAllStatus={allClick}
                  totalDoc={10}
                  currentPage={1}
                  start={1}
                  end={1}
                  pageSize={1}
                 onPageChange={(e)=> console.log(e)}
                />
          </div>}
            <ModifyTableCall open={isOpen} onClose={()=> setIsOpen(!isOpen)} data={tableList}/>
         </div>
        </MainLayout>
    </>
  )
}

export const getServerSideProps = async (appCtx) => {
    let access_token =
    "cookie" in appCtx.req.headers ? appCtx.req.headers.cookie : null;
   
    let table 
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
      const {data} = await masterTableApi.allTable(access_token)
      table  =  data
      // console.log(data)
    }catch(err){
      console.log(err,'err')
    }
    return {
      props:{
         user:auth || {},
         access_token,
         tables:table||[]
      }
    }
  
  }

export default Page
