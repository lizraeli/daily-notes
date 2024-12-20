import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addDays, subDays } from 'date-fns';
import { dateFormatterLong, dateToString, stringToDate } from '../../utils';
import TextEditor from '../../components/TextEditor';
import HomeIcon from '../../assets/home.svg';
import LeftArrowIcon from '../../assets/arrow-left.svg';
import RightArrowIcon from '../../assets/arrow-right.svg';
import { addNote, getNoteByDate, Note, debouncedUpdateNote } from '../../api';
import Spinner from '../../components/Spinner';
import styles from './styles.module.css';

enum SaveState {
  IDLE = 'IDLE',
  SAVING = 'SAVING',
  SAVED = 'SAVED',
}

function DailyNotes() {
  const navigate = useNavigate();
  const { date: urlDate } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const [saveState, setSaveState] = useState<SaveState>(SaveState.IDLE);
  const [isFetchingNote, setIsFetchingNote] = useState(false);
  const [fetchingError, setFetchingError] = useState<unknown>(null);
  const parsedDate = useMemo(
    () => (urlDate ? stringToDate(urlDate) : null),
    [urlDate]
  );

  const prevDay = parsedDate && subDays(parsedDate, 1);
  const prevDayUrl = prevDay && `/day/${dateToString(prevDay)}`;
  const nextDay = parsedDate && addDays(parsedDate, 1);
  const nextDayUrl = nextDay && `/day/${dateToString(nextDay)}`;

  useEffect(() => {
    if (!parsedDate) {
      return;
    }

    const doFetchNote = async () => {
      try {
        setIsFetchingNote(true);

        const fetchedNote = await getNoteByDate(parsedDate);
        if (fetchedNote) {
          setNote(fetchedNote);
        } else {
          const addedNodeDoc = await addNote(parsedDate);
          setNote(addedNodeDoc);
        }
        setIsFetchingNote(false);
      } catch (err) {
        setFetchingError(err);
        setIsFetchingNote(false);
      }
    };

    doFetchNote();
  }, [urlDate, parsedDate]);

  const onUpdateHtml = (html: string) => {
    if (!note) {
      return;
    }

    const doUpdateNote = async () => {
      setSaveState(SaveState.SAVING);
      await debouncedUpdateNote(note, html);
      setSaveState(SaveState.SAVED);
    };

    doUpdateNote();
  };

  const content = () => {
    if (!parsedDate) {
      return <Spinner fullPage />;
    }

    return (
      <div
        className={styles['daily-note-container']}
        style={{ viewTransitionName: 'day' }}
      >
        <div className={styles['editing-container']}>
          <div className={styles['header']}>
            <div>
              <a
                className={styles['all-notes-link']}
                onClick={() =>
                  navigate('..', { unstable_viewTransition: true })
                }
              >
                <button className="home-btn">
                  <HomeIcon />
                </button>
              </a>
            </div>
            {saveState === SaveState.SAVING && (
              <div className={styles.saveState}>Saving...</div>
            )}

            {saveState === SaveState.SAVED && (
              <div className={styles.saveState}>All changes saved</div>
            )}
          </div>

          <div className={styles['daily-note-controls']}>
            {prevDayUrl && (
              <Link to={prevDayUrl}>
                <LeftArrowIcon title="right-arrow-large" />
              </Link>
            )}
            <div className={styles.date}>
              Daily notes for {dateFormatterLong.format(parsedDate)}
            </div>
            {nextDayUrl && (
              <Link to={nextDayUrl}>
                <RightArrowIcon title="right-arrow-large" />
              </Link>
            )}
          </div>

          {fetchingError ? (
            <div className={styles['error-container']}>Error fetching note</div>
          ) : (
            <TextEditor
              html={note ? note.content : ''}
              setHtml={onUpdateHtml}
              isFetching={isFetchingNote}
            />
          )}
        </div>
      </div>
    );
  };

  return <>{content()}</>;
}

export default DailyNotes;
