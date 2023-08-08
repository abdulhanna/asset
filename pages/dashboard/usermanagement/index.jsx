import React from 'react'

const UserList = () => {
  return (
    <div>
      
    </div>
  )
}
export const getServerSideProps = async (appCtx) => {



    return {
      redirect: {
        destination: '/dashboard/usermanagement/allUser',
        permanent: false,
      },
    };

  

 
  return {
    props: {
      data: [

      ],
     
    }
  }


}


export default UserList
