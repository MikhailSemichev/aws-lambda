import { DynamoDB, Lambda } from 'aws-sdk';
import { Context, APIGatewayProxyResult, APIGatewayEvent } from 'aws-lambda';
import { toString } from '../utils/helper';

export async function getCategories(
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  console.log('getCategories: call');

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'categories',
    }),
  };
}

export async function getCategoryById(
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  console.log('getCategoryById: call');

  return {
    statusCode: 200,
    body: JSON.stringify({
      categoryId: event.pathParameters?.categoryId,
      message: 'GET category',
    }),
  };
}

export async function createCategory(
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  console.log('createCategory');

  return {
    statusCode: 200,
    body: JSON.stringify({
      category: event.body,
      message: 'Create category',
    }),
  };
}

export async function updateCategoryById(
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  console.log('updateCategory');

  return {
    statusCode: 200,
    body: JSON.stringify({
      categoryId: event.pathParameters?.categoryId,
      category: event.body,
      message: 'updateCategoryById',
    }),
  };
}

export async function deleteCategoryById(
  event: APIGatewayEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  console.log('deleteCategory: call');

  return {
    statusCode: 200,
    body: JSON.stringify({
      categoryId: event.pathParameters?.categoryId,
      message: 'delete category',
    }),
  };
}
