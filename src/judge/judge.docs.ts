import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  GetLanguagesResponse,
  ListProblemResponse,
  ListUserSubmissionRepsonse,
  ReadProblemResponse,
  RunProblemResponse,
  SubmitProblemResponse,
} from './response';
import { SubmissionFilterDocs } from './decorator/submission-filter.decorator';
import { SubmissionDomain } from 'domains';

export class JudgeDocs {
  public static Controller() {
    return applyDecorators(ApiTags('Judge0'), ApiBearerAuth());
  }
  public static GetLanguages() {
    return applyDecorators(
      ApiOperation({ summary: '지원하는 언어 목록 출력' }),
      ApiOkResponse({ type: GetLanguagesResponse, isArray: true }),
    );
  }

  public static ListProblem() {
    return applyDecorators(
      ApiOperation({ summary: '문제 리스트 출력' }),
      ApiOkResponse({ type: ListProblemResponse, isArray: true }),
    );
  }

  public static ReadProblem() {
    return applyDecorators(
      ApiOperation({ summary: '문제 반환' }),
      ApiOkResponse({
        type: ReadProblemResponse,
      }),
      ApiBadRequestResponse({ description: ['PROBLEM_NOT_FOUND'].join(', ') }),
    );
  }

  public static RunProblem() {
    return applyDecorators(
      ApiOperation({ summary: 'Public Example 실행' }),
      ApiOkResponse({
        type: RunProblemResponse,
        isArray: true,
      }),
      ApiBadRequestResponse({
        description: ['PROBLEM_NOT_FOUND', 'EXAMPLE_NOT_EXIST'].join(', '),
      }),
    );
  }

  public static SubmitProblem() {
    return applyDecorators(
      ApiOperation({ summary: '최종 제출' }),
      ApiOkResponse({
        type: SubmitProblemResponse,
      }),
      ApiBadRequestResponse({
        description: ['PROBLEM_NOT_FOUND', 'EXAMPLE_NOT_EXIST'].join(', '),
      }),
    );
  }

  public static ListUserSubmission() {
    return applyDecorators(
      ApiOperation({ summary: '사용자 Submission 리스트' }),
      ApiOkResponse({ type: ListUserSubmissionRepsonse, isArray: true }),
      ...SubmissionFilterDocs,
    );
  }

  public static ReadUserSubmission() {
    return applyDecorators(
      ApiOperation({ summary: '사용자 Submission 상세보기' }),
      ApiOkResponse({ type: SubmissionDomain }),
      ApiForbiddenResponse({
        description: ['FORBIDDEN_REQUEST'].join(', '),
      }),
    );
  }

  public static UpdateUserSubmission() {
    return applyDecorators(
      ApiOperation({ summary: '사용자 Submission isPublic 변경' }),
      ApiOkResponse({ type: SubmissionDomain }),
      ApiForbiddenResponse({}),
    );
  }
}
