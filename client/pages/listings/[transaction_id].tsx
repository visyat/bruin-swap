import { useRouter } from 'next/router';
import { IListing } from '@/.next/types/listing';
import { LISTINGS } from '../../constants/temp_data';
import { useEffect, useState } from 'react';
import {
	makeStyles,
	shorthands,
	Body1,
	Caption1,
	ToggleButton,
    Theme,
    LargeTitle,
} from '@fluentui/react-components';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }, courseName: {
        marginTop: tokens.spacingVerticalXL,
        marginBottom: tokens.spacingVerticalXL,
    }, contents: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '100%',
        minWidth: '100%',
    }, left: {
        flex: 1,
        marginRight: tokens.spacingHorizontalS,
        ...shorthands.padding(tokens.spacingHorizontalM),
    }, right: {
        flex: 1,
        marginLeft: tokens.spacingHorizontalS,
        ...shorthands.padding(tokens.spacingHorizontalM),
    }, button: {
        marginTop: tokens.spacingHorizontalM,
    },
});

const ListingPage = () => {
    const router = useRouter();
    const styles = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [listing, setListing] = useState<IListing | null>(null);
    const [selectedClassIndex, setSelectedClassIndex] = useState(-1);
    const { transaction_id } = router.query;
    var transaction_id_num = -1;

    useEffect(() => {
        console.log(`Transaction param: ${transaction_id}`)
        const fetchListing = async () => {
            if (!transaction_id) {
                return;
            }
            setIsLoading(true);
            // Try to parse listing data
            try {
                if (typeof transaction_id !== 'string') {
                    throw 'did not get a valid transaction_id';
                }
                transaction_id_num = parseInt(transaction_id);
            } catch (error) {
                console.log(`Could not get transaction. ${typeof transaction_id} ${transaction_id} is not a valid transaction ID`);
            }
            // Try to fetch listing data
            try {
                // fetch here
                const res = LISTINGS.filter((listing: IListing) =>
                    listing.transaction_id == transaction_id_num
                )[0];
                setListing(res);
            } catch (error) {
                console.log(`Could not get transaction ${transaction_id}: ${error}`);
            }
            setIsLoading(false);
        };

        fetchListing();
    }, [transaction_id]); // Should not change

    if (isLoading) {
        return <div>Loading...</div>; // TOOD: improve loading page
    } if (!listing) {
        return <div>Listing not found</div>
    }

    const titleString = `${listing.classDept} ${listing.classNum} - ${listing.classTitle}`
    const classesWanted = listing.classWanted.map((name, i) => (
        <ToggleButton 
            className={styles.button} 
            key={i} 
            appearance="outline" 
            shape="circular"
            onClick={() => setSelectedClassIndex(i)}
            checked={selectedClassIndex === i}
        >
            {name}
        </ToggleButton>
    ));

    return (
        <div className={styles.container}>
            <div className={styles.courseName}>
                <LargeTitle>{titleString}</LargeTitle>
            </div>
            <div className={styles.left}>
                <Body1>{`Instructor: ${listing.instructor}\n`}</Body1>
                <Body1>{`Section: ${listing.lecture}`}</Body1>
            </div>
            <div className={styles.right}>
                <Body1>In exchange for:</Body1>
                {classesWanted}
            </div>
        </div>
    );

    return<div>Listing {transaction_id}: {JSON.stringify(listing)}</div>
};

export default ListingPage;
