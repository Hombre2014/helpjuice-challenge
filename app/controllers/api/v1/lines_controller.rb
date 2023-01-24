class Api::V1::LinesController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    @lines = Line.all.order(:id)
    render json: @lines, status: :ok
  end

  # def show
  #   @line = Line.find(params[:id])
  #   render json: @line
  # end

  def new
    @line = Line.new
    render json: @line
  end

  def update_content
    @line = Line.find(params[:id])
    @line.update(content: params[:content])
    render json: @line
  end

  def create
    @line = Line.new(line_params)
    if @line.save
      render json: { data: @line, status: 'success' }, status: :ok
    else
      render json: { data: @line.errors.full_messages, status: 'failure' }, status: :unprocessable_entity
    end
  end

  # def update
  #   @line = Line.find(params[:id])
  #   @line.update(line_params)
  #   render json: @line
  # end

  # def destroy
  #   @line = Line.find(params[:id])
  #   @line.destroy
  #   render json: @line
  # end

  private

  def line_params
    params.require(:line).permit(:content, :header)
  end
end
