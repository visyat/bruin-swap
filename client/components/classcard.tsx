// components/navbar/classcard.tsx
import {
    makeStyles,
    shorthands,
    Body1,
    Caption1,
    Button,
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
} from "@fluentui/react-components";
import { ArrowSwapFilled } from '@fluentui/react-icons';

const useStyles = makeStyles({
    card: { // fill div
        ...shorthands.margin('auto'),
        width: '100%',
        maxWidth: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // ensure even footer
    }, details: { // department, number, title, instructor
        display: 'flex',
        flexDirection: 'column',
    }, header: { 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 0,
    }, preview: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: '10px',
        flexGrow: 0,
    }, footer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: '10px',
        flexGrow: 0,
    }, swap: {
        backgroundColor: 'transparent',
        ...shorthands.border('2px', 'solid', 'rgb(19, 19, 19)'),
        minWidth: '100px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '5px',
        paddingBottom: '5px',
        borderRadius: '15px',    
    }
})

interface ClassCard {
    id: number;
    classDept: string;
    classNum: string;
    classTitle: string
    instructor: string;
    lecture: string;
};

interface CardProps {
    data: ClassCard;
}

const cardTokens = {
    childrenGap: '12px',
    padding: '12px',
};  

const ClassCard: React.FC<CardProps> = ({ data }) => {
    const { id, classDept, classNum, classTitle, instructor, lecture } = data;
    const styles = useStyles();

	return (
        <Card 
            className={styles.card}
            appearance="filled"
            as="div"
            size="small"
        >
        <CardHeader 
            className={styles.header}
            header={
                <div className={styles.details}>
                    <Body1>{`${classDept} ${classNum}: ${classTitle}`}</Body1>
                </div>
            }
            description={
                <Caption1>{`${instructor}`}</Caption1>
            }
        />
        {/* Include CardPreview for wanted classes */}
        <CardFooter
            className={styles.footer}
            action={
                <Button 
                    className={styles.swap} 
                    icon={<ArrowSwapFilled />}
                    as="button"
                    appearance="primary"
                    shape="rounded"
                >
                    Swap!
                </Button>
            }
        >
            <Caption1>Lecture: {lecture}</Caption1>
        </CardFooter>
        </Card>
	);
};

export default ClassCard;