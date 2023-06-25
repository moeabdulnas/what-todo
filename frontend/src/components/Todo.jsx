import {BsTrash} from 'react-icons/bs'


/* eslint-disable react/prop-types */
const Todo = ( {todo} ) => {

    return (
        <>
            <div className='flex justify-between items-center'>
                <p className="text-lg sm:text-2xl">{todo.text}</p>
                <div className='flex gap-3 sm:gap-6'>
                    <input type="checkbox" name="check" id="check" className='w-4 md:w-6'/>
                    <BsTrash className='cursor-pointer text-xl md:text-2xl'/>
                </div>
            </div>
        </>
    )
}

export default Todo;