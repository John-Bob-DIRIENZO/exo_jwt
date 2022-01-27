export default function NotAuthorized({neededRole}) {
    return (
        <div className='p-5'>
            <h1 className='mb-5'>Not Authorized</h1>
            <p>Désolé, il semble qu'il faille être {neededRole} pour entrer ici</p>
        </div>
    )
}