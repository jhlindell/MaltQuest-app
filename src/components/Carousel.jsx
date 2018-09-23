import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import hops from '../images/hops.jpg';
import malt from '../images/Malt.jpg';
import yeast from '../images/yeast.png';
import water from '../images/water.jpg';

const pictures = [
  {
    src: malt,
    altText: '',
    caption: ''
  },
  {
    src: hops,
    altText: '',
    caption: ''
  },
  {
    src: yeast,
    altText: '',
    caption: ''
  },
  {
    src: water,
    altText: '',
    caption: ''
  },
];

const Carousel = () => <UncontrolledCarousel items={pictures} />;

export default Carousel;