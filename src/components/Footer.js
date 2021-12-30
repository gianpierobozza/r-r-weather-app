import { Link } from "@material-ui/core";

const Footer = () => {
	return (
		<div className="footer">
			<div>&copy; Gianpiero Bozza</div>
			<div className="icons-attribution">
				Weather icons made by <Link href="https://www.flaticon.com/authors/pixel-perfect" color="inherit" target="_blank" rel="noopener">Pixel perfect</Link> from <Link href="https://www.flaticon.com/" color="inherit" target="_blank" rel="noopener">www.flaticon.com</Link>&nbsp;-
				Sunset icon made by <Link href="https://www.flaticon.com/authors/freepik" color="inherit" target="_blank" rel="noopener">Freepik</Link> from <Link href="https://www.flaticon.com/" color="inherit" target="_blank" rel="noopener">www.flaticon.com</Link>
			</div>
		</div>
	);
};

export default Footer;