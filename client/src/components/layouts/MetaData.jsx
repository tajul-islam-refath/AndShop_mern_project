import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - And Shop`}</title>
        </Helmet>
    );
}

export default MetaData;
