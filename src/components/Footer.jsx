import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

export const Footer = () => {
	return (
		<>
			<Navbar className='fixed-bottom' bg='dark' variant='dark'>
				<Container>
					<Navbar.Brand href='https://www.linkedin.com/in/vitali-undro/'>
						Vitaly Undro
					</Navbar.Brand>
				</Container>
			</Navbar>
		</>
	);
};
