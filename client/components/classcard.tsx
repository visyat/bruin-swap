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
  
const useStyles = makeStyles({
    card: {
        ...shorthands.margin('auto'),
        width: '720px',
        maxWidth: '100%',
    }
})

interface ClassProps {
    data: {
        id: number;
        classDept: string;
        classNum: string;
        classTitle: string;
        instructor: string;
        lecture: string;
    };
}

const Class: React.FC<ClassProps> = ({ data }) => {
    const { id, classDept, classNum, classTitle, instructor, lecture } = data;
    const styles = useStyles();

	return (
        <Card className={styles.card}>
            <CardHeader 
            
            />
            <CardPreview 
            
            />
            <CardFooter

            />
        </Card>
	);
};

export default Class;
