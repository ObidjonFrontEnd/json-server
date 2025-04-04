import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import useDeleteData from './hooks/delete'
import useGetData from './hooks/get'
import usePostData from './hooks/post'
import useUpdateData from './hooks/put'

function App() {
	const { data, refech } = useGetData('/cars')
	const { postData, loading } = usePostData('/cars')
	const [idCar, idCarSet] = useState('')
	const [name, nameSet] = useState('')
	const [price, priceSet] = useState('')
	const [model, modelSet] = useState('')
	const [year, yearSet] = useState('')
	const [isTrue, isTrueSet] = useState(true)
	const [modalOpenClose, modalOpenCloseSet] = useState(true)

	const { updateData } = useUpdateData('/cars')
	const { deleteData } = useDeleteData('/cars')

	const submit = async e => {
		e.preventDefault()
		await postData({ name, price, model, year, img: 'defold.jpg' })
		refech()
		modalOpenCloseSet(!modalOpenClose)
	}

	const deleteDataBook = async id => {
		await deleteData(id)
		refech()
	}

	const upDateBook = async event => {
		event.preventDefault()
		await updateData(idCar, { name, price, model, year, img: 'defold.jpg' })
		refech()
		modalOpenCloseSet(!modalOpenClose)
	}

	return (
		<div className='relative'>
			<div className='cards grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px] px-[20px] max-w-[1110px] mx-auto '>
				{data?.map(({ name, price, model, year, img, id }) => {
					return (
						<div
							className='card px-[20px] py-[20px] mx-auto shadow-lg w-full rounded-[8px] h-[350px]'
							key={id ? id : ''}
						>
							<div className='img w-full'>
								<img
									src={`${img ? img : ''}`}
									alt=''
									className='w-full h-full'
								/>
							</div>

							<div className='flex w-full justify-between mt-[20px] text-[18px]'>
								<h2 className='font-bold '>{name ? name : ''}</h2>
								<h2>Model: {model ? model : ''}</h2>
							</div>

							<div className='flex w-full justify-between mt-[20px] text-[16px]'>
								<h2>{year ? year : ''} year</h2>
								<h2 className='text-red-600 font-bold'>
									{price ? price : ''}$
								</h2>
							</div>

							<div className='flex w-full justify-between mt-[20px]'>
								<button
									onClick={() => {
										modalOpenCloseSet(false)
										upDateBook
										isTrueSet(false)
										idCarSet(id)
									}}
									className='bg-green-400 active:bg-green-200 hover:bg-green-300 text-white font-bold px-[20px] py-[5px] rounded-[8px]'
								>
									UpData
								</button>
								<button
									onClick={() => {
										deleteDataBook(id)
										idCarSet(id)
									}}
									className='bg-red-400 active:bg-red-200 hover:bg-red-300 text-white font-bold px-[20px] py-[5px] rounded-[8px]'
								>
									Delete
								</button>
							</div>
						</div>
					)
				})}
				<div
					className='card px-[20px] bg-white hover:bg-cyan-500 w-full py-[20px] flex justify-center items-center shadow-lg text-[50px] rounded-[8px] group duration-[0.3s] h-[350px]'
					onClick={() => {
						modalOpenCloseSet(!modalOpenClose)
						isTrueSet(true)
					}}
				>
					<PlusOutlined className='group-hover:text-white' />
				</div>
			</div>

			<div
				className={`${
					modalOpenClose ? 'scale-0' : ''
				} modal w-full absolute top-0 left-0 h-[100vh] flex items-center duration-[0.5s] justify-center bg-white`}
			>
				<form
					action=''
					onSubmit={isTrue ? submit : upDateBook}
					className='flex flex-col px-[20px] w-[300px]  mx-auto gap-[15px] relative'
				>
					<div className='title text-[20px] font-bold text-center text-cyan-500'>
						<h1>{isTrue ? 'Add Car' : 'Update Car'}</h1>
					</div>

					<input
						type='text'
						placeholder='name'
						onChange={e => {
							nameSet(e.target.value)
						}}
						className='border-gray-400 border-[1px] rounded-[15px] px-[8px] py-[5px] outline-none'
					/>

					<input
						type='text'
						placeholder='price'
						onChange={e => {
							priceSet(e.target.value)
						}}
						className='border-gray-400 border-[1px] rounded-[15px] px-[8px] py-[5px] outline-none'
					/>

					<input
						type='text'
						placeholder='model'
						onChange={e => {
							modelSet(e.target.value)
						}}
						className='border-gray-400 border-[1px] rounded-[15px] px-[8px] py-[5px] outline-none'
					/>

					<input
						type='text'
						placeholder='year'
						onChange={e => {
							yearSet(e.target.value)
						}}
						className='border-gray-400 border-[1px] rounded-[15px] px-[8px] py-[5px] outline-none'
					/>

					{loading ? (
						<button className='bg-cyan-500 rounded-[15px] text-white font-bold py-[5px]'>
							loading...
						</button>
					) : (
						<button className='bg-cyan-500 rounded-[15px] text-white font-bold py-[5px]'>
							Save
						</button>
					)}
					<CloseOutlined
						onClick={() => {
							modalOpenCloseSet(!modalOpenClose)
						}}
						className='absolute top-[-50px] right-[-15px] text-[23px] text-cyan-500 font-bold'
					/>
				</form>
			</div>
		</div>
	)
}

export default App
