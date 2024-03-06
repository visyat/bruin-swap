import { useRef, useState } from 'react';
import styles from '../styles/CourseCard.module.css';

interface WishlistCourseCardProps {
    courseName: string;
    description: string;
    professor: string;
    discussionSection: string;
}


const WishlistCourseCard: React.FC<WishlistCourseCardProps> = (props) => {
    const elementRef = useRef(null);
    
   function deleteCourses() {
    let element = document.getElementById('coursesSection') as HTMLElement;
    if (element) {
        element.remove();
    }
};
    return (
        <div>
        <div className={`${styles.courseCard} ${styles.flexContainer}` } id="coursesSection">
        <div className={`${styles.content} ${styles.flexContainer} `}>
            <p className={styles.courseName}>{props.courseName}</p>
        </div>
        <div className={`${styles.content} ${styles.flexContainer} `}>
            <p className={styles.courseName}>{props.description}</p>
        </div>
        <div className={styles.flexContainer}>
            <p className={styles.professor} >Professor:</p>
            <p className={styles.sectionHighlight}>{props.professor}</p>
        </div>
        <div className={styles.flexContainer}>
            <p  className={styles.discussion}>Discussion Section:</p>
            <p className={styles.sectionHighlight}>{props.discussionSection}</p>
        </div>
        <button onClick={deleteCourses} className={styles.deleteButton}>⛔</button>
    </div>
    </div>
    )
}

export default WishlistCourseCard;