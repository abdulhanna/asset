import React from 'react'

const Page = () => {
  return (
    <div>
      
    </div>
  )
}

export const getServerSideProps = async (appCtx) => {

    return {
        redirect: {
          destination: '/dashboard/master-table/table',
          permanent: false,
        },
      };
  
  }
export default Page
