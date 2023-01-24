class Api::V1::LinesController < ApplicationController
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def index
    @lines = Line.all.order(:id)
    render json: @lines, status: :ok
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

  private

  def line_params
    params.require(:line).permit(:content, :header)
  end
end
