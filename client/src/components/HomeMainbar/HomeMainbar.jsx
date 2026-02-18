import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate, useSearchParams} from 'react-router-dom'
import {useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './HomeMainbar.css'
import QuestionList from './QuestionList'
import { fetchAllQuestions, fetchQuestionStats } from '../../actions/question'

const HomeMainbar = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const questionsState = useSelector((state)=>state.questionsReducer)
  const questionsList = questionsState.data
  const pagination = questionsState.pagination
  const stats = questionsState.stats
  const [tagInput, setTagInput] = useState("");

  const q = searchParams.get("q") || "";
  const tag = searchParams.get("tag") || "";
  const sort = searchParams.get("sort") || "newest";
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10) || 1, 1);

  useEffect(() => {
    setTagInput(tag);
  }, [tag]);

  useEffect(() => {
    dispatch(fetchAllQuestions({ q, tag, sort, page, limit: 10 }));
    dispatch(fetchQuestionStats());
  }, [dispatch, q, tag, sort, page, location.pathname]);

  const updateQueryParams = (updates) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      const normalizedValue = String(value ?? "").trim();
      if (!normalizedValue || (key === "sort" && normalizedValue === "newest")) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, normalizedValue);
      }
    });

    if (!nextParams.get("page")) {
      nextParams.set("page", "1");
    }

    setSearchParams(nextParams);
  };

    const checkAuth = () => {
      if(user === null) {
        alert("login or signup to ask questions")
        navigate('/Auth')
      }else {
        navigate('/AskQuestion')
      }
    }

    const handleSortChange = (e) => {
      updateQueryParams({ sort: e.target.value, page: "1" });
    };

    const handleTagSubmit = (e) => {
      e.preventDefault();
      updateQueryParams({ tag: tagInput, page: "1" });
    };

    const goToNextPage = () => {
      updateQueryParams({ page: String(page + 1) });
    };

    const goToPrevPage = () => {
      updateQueryParams({ page: String(Math.max(page - 1, 1)) });
    };


  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname === '/' ? <h1>Top Question</h1> : <h1>All Question</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Questions</button>
      </div>
      <div className='main-bar-toolbar'>
        <div className='toolbar-stats'>
          <p>{pagination.total} Questions</p>
          {stats && (
            <p className='toolbar-muted'>
              {stats.totalAnswers} Answers • {stats.unansweredQuestions} Unanswered
            </p>
          )}
        </div>
        <div className='toolbar-controls'>
          <form onSubmit={handleTagSubmit} className='toolbar-tag-form'>
            <input
              type='text'
              placeholder='Filter by tag'
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button type='submit'>Apply</button>
          </form>
          <select value={sort} onChange={handleSortChange} aria-label='Sort questions'>
            <option value='newest'>Newest</option>
            <option value='oldest'>Oldest</option>
            <option value='mostVotes'>Most Votes</option>
            <option value='mostAnswers'>Most Answers</option>
          </select>
        </div>
      </div>
      <div>
        {
          questionsList === null ?
          <p>Loading questions...</p> :
          <>
          {questionsList.length === 0 ? (
            <p>No questions found for your current filters.</p>
          ) : (
            <QuestionList questionsList={questionsList}/>
          )}
          <div className='pagination-controls'>
            <button type='button' onClick={goToPrevPage} disabled={!pagination.hasPrevPage}>
              Previous
            </button>
            <p>
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <button type='button' onClick={goToNextPage} disabled={!pagination.hasNextPage}>
              Next
            </button>
          </div>
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
