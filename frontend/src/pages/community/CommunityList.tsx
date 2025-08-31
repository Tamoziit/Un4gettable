import { MdGroup } from 'react-icons/md';
import AppNavbar from '../../components/navbars/AppNavbar';
import { useEffect, useState } from 'react';
import type { Communities } from '../../types';
import useGetMyCommunities from '../../hooks/useGetMyCommunities';
import Spinner from '../../components/Spinner';
import CommunityCard from '../../components/community/CommunityCard';

const CommunityList = () => {
	const [myCommunities, setMyCommunities] = useState<Communities[] | null>(null);
	const { loading, getMyCommunities } = useGetMyCommunities();

	const fetchMyCommunities = async () => {
		const data = await getMyCommunities();
		setMyCommunities(data);
	}

	useEffect(() => {
		fetchMyCommunities();
	}, []);

	if (loading || !myCommunities) {
		return (
			<div className="flex items-center justify-center h-screen text-white p-6">
				<Spinner size="large" />
			</div>
		);
	}

	return (
		<>
			<AppNavbar />

			<div className="mx-auto w-full px-6 md:px-10 pt-22 pb-6">
				<div className="mb-8 flex flex-col items-center justify-center w-full gap-2">
					<h1 className="text-3xl font-bold text-gray-200 text-center">
						Community Chat & Support
					</h1>
					<p className="text-gray-300 text-lg italic text-center">
						Connect with fellow users, share your experiences, and get real-time support on sustainability challenges.
					</p>
				</div>

				<div>
					<h1 className='text-gray-300/80 text-2xl font-semibold'>Your Communities</h1>
					<div className='w-full h-[1px] mb-6 mt-2 bg-gray-400' />

					{myCommunities.length === 0 ? (
						<div className="text-center py-16">
							<div className="p-8 max-w-md mx-auto">
								<MdGroup className="text-6xl text-gray-300 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-400 mb-2">
									No Communities Available
								</h3>
								<p className="text-gray-500">
									Check back later for new communities to join!
								</p>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{myCommunities?.map((community) => (
								<CommunityCard
									community={community}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default CommunityList;