import styles from './Modal.module.scss';
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Modal = (props) => {
	const { data, onCloseHandler, selectedItem } = props;

	const [carousalSliderNav, setCarousalSliderNav] = useState(null);
  const [thumbnailSliderNav, setThumbnailSliderNav] = useState(null);
  const carousalSlider = useRef(null);
  const thumbnailSlider = useRef(null);

  useEffect(() => {
    setCarousalSliderNav(carousalSlider.current);
    setThumbnailSliderNav(thumbnailSlider.current);
  }, []);

	const carousalSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false
	};

	const thumbnailSettings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 3,
				}
			}
		]
	};

	useEffect(() => {
		carousalSlider.current.slickGoTo(selectedItem, true);
	}, [selectedItem])
	
	return (
		<div className={styles.overlayOuter}>
			<div className={styles.overlayInner}>
				<div className={styles.closeBtn}>
					<span onClick={onCloseHandler}>X</span>
				</div>
				<Slider asNavFor={thumbnailSliderNav} ref={carousalSlider} {...carousalSettings}>
					{data.map((item) => (
						<div className={styles.carusalSlide} key={item?.url}>
							<img src={item.url} alt={item?.altText} />
						</div>
					))}
				</Slider>
				<Slider
					asNavFor={carousalSliderNav}
					ref={thumbnailSlider}
					slidesToShow={3}
					swipeToSlide={true}
					focusOnSelect={true}
					{...thumbnailSettings}
				>
					{data.map((item) => (
						<div className={styles.thumbnailSlide} key={item?.url}>
							<img src={item.url} alt={item?.altText} />
						</div>
					))}
				</Slider>
			</div>
		</div>
	)
}

export default Modal;