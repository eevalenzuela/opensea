import Header from '../layout/header';
import Footer from '../layout/footer';
import Box from '../components/box';

const Calendar = () => {
  return (
    <>
      <div className="min-h-full">
        <Header></Header>
        <Box title="Calendar"></Box>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Calendar;
