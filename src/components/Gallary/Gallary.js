import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import styles from './Gallary.module.scss';
import { useCallback, useEffect, useState } from 'react';

const Gallary = (props) => {
	const { data } = props;

	const [activeCatgeory, setActiveCatgeory] = useState('All');
	const [filteredData, setFilteredData] = useState(data);
	const [openModal, setIsOpenModal] = useState(false);
	const [clickedItem, setClickedItem] = useState(null);

	const handleItemClick = (itemName) => {
    setActiveCatgeory(itemName);
  };

	const handleDataFilter = useCallback((activeCatgeory) => {
		const filterData =
    activeCatgeory === 'All'
      ? data
      : data.filter((item) => item.category === activeCatgeory);

		setFilteredData(filterData);
	}, [data]);

	const handleCardClick = (index) => {
		setClickedItem(index);
		setIsOpenModal(true);
	}

	const handleModalClose = () => {
		setIsOpenModal(false);
	}

	useEffect(() => {
		handleDataFilter(activeCatgeory);
	}, [activeCatgeory, handleDataFilter]);

	return (
		<>
			<h1>Photo Gallary</h1>
			<p>lorem ipsum is simply dummy test of type setting industry</p>
			<div className={styles.option}>
				<span className={activeCatgeory === 'All' ? styles.active : ''} onClick={() => handleItemClick('All')}>
					All
				</span>
				<span className={activeCatgeory === 'Branding' ? styles.active : ''} onClick={() => handleItemClick('Branding')}>
					Branding
				</span>
				<span className={activeCatgeory === 'Design' ? styles.active : ''} onClick={() => handleItemClick('Design')}>
					Design
				</span>
				<span className={activeCatgeory === 'Development' ? styles.active : ''} onClick={() => handleItemClick('Development')}>
					Development
				</span>
			</div>
			<div className={styles.cardWrapper}>
				{filteredData.map((item, index) => (
					<Card key={item.url} item={item} onCardClickHandler={() => handleCardClick(index)} />
				))}
			</div>
			{openModal && <Modal data={filteredData} onCloseHandler={handleModalClose} selectedItem={clickedItem}/>}
		</>
	)
}

export default Gallary;