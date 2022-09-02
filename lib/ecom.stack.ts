import * as cdk from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

import { ping } from '../src/lambdas/ping.lambda';
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} from '../src/lambdas/categories.lambda';

import { Construct } from 'constructs';

export class EcomStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = this.createApiGateway();

    // Lambdas

    const pingLambda = new NodejsFunction(this, 'PingLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, '../src/lambdas/ping.lambda.ts'),
      handler: ping.name,
    });

    const getCategoriesLambda = new NodejsFunction(this, 'getCategoriesLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, '../src/lambdas/categories.lambda.ts'),
      handler: getCategories.name,
    });

    const getCategoryByIdLambda = new NodejsFunction(this, 'getCategoryByIdLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, '../src/lambdas/categories.lambda.ts'),
      handler: getCategoryById.name,
    });

    const createCategoryLambda = new NodejsFunction(this, 'createCategoryLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, '../src/lambdas/categories.lambda.ts'),
      handler: createCategory.name,
    });

    const updateCategoryByIdLambda = new NodejsFunction(this, 'updateCategoryByIdLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, '../src/lambdas/categories.lambda.ts'),
      handler: updateCategoryById.name,
    });

    const deleteCategoryByIdLambda = new NodejsFunction(this, 'deleteCategoryByIdLambda', {
      runtime: lambda.Runtime.NODEJS_16_X,
      entry: path.join(__dirname, '../src/lambdas/categories.lambda.ts'),
      handler: deleteCategoryById.name,
    });

    // /ping
    const pingApi = api.root.addResource('ping');
    pingApi.addMethod('GET', new apigateway.LambdaIntegration(pingLambda, { proxy: true }));

    // /categories
    const categoriesApi = api.root.addResource('categories');
    categoriesApi.addMethod('GET', new apigateway.LambdaIntegration(getCategoriesLambda));
    categoriesApi.addMethod('POST', new apigateway.LambdaIntegration(createCategoryLambda));

    const categoryIdApi = categoriesApi.addResource('{categoryId}');
    categoryIdApi.addMethod('GET', new apigateway.LambdaIntegration(getCategoryByIdLambda));
    categoryIdApi.addMethod('PUT', new apigateway.LambdaIntegration(updateCategoryByIdLambda));
    categoryIdApi.addMethod('DELETE', new apigateway.LambdaIntegration(deleteCategoryByIdLambda));
  }

  createApiGateway(): apigateway.RestApi {
    const api = new apigateway.RestApi(this, 'api', {
      description: 'Categories Api Gateway',
      deployOptions: {
        stageName: 'dev',
      },
      defaultCorsPreflightOptions: {
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      },
    });

    new cdk.CfnOutput(this, 'apiUrl', { value: api.url });

    return api;
  }
}
