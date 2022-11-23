import { useState, useEffect } from "react";
import CourseCreate from "../../pages/instructor/course/create";

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtonText,
  handleImageRemove = (f) => f,
  editPage = false,
}) => {
  const children = [];
  for (let i = 9.99; i <= 101.99; i++) {
    children.push(<option key={i.toFixed(2)}>${i.toFixed(2)}</option>);
  }

  return (
    <>
      {values && (
        <form onSubmit={handleSubmit} className="">
          <div className="flex-vertical items-center mb-6">
            {/* Name Input */}
            <div className="flex-row  mb-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Description Text Area */}
            <div className="flex-row  mb-2">
              <textarea
                className="textarea w-full textarea-bordered"
                name="description"
                cols="7"
                rows="7"
                placeholder="Description"
                value={values.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Paid & Free Course // True False */}
            <div className="flex-row  mb-2">
              ** WORKING **
              <select
                name="paid"
                value={values.paid}
                onChange={(v) => setValues({ ...values, paid: !values.paid })}
                className="select"
              >
                <option value={true}>Paid</option>
                <option value={false}>Free</option>
              </select>
            </div>

            {/* $9.99 - $99.99 */}
            <div className="flex-row mb-2">
              **** BROKEN *****
              <select
                name="price"
                value={values.price}
                // onChange={handleChange}
                onChange={(c) => setValues({ ...values, price: c })}
                className="select"
              >
                {children}
              </select>
            </div>

            {/* Category Input */}
            <div className="flex-row  mb-2">
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={values.category}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            {/* Upload Image Button */}
            <div className="flex-row  mb-2">
              <label className="btn">
                {uploadButtonText}
                <input
                  type="file"
                  name="image"
                  onChange={handleImage}
                  accept="image/*"
                  hidden
                />
              </label>
            </div>

            {preview && (
              <div>
                <div
                  onClick={handleImageRemove}
                  className="badge badge-black cursor-pointer"
                >
                  X
                </div>
                <img className="mask mask-circle h-20 w-20" src={preview} />
              </div>
            )}

            {editPage && (
              <img
                className="mask mask-circle h-20 w-20"
                src={values?.image?.Location}
              />
            )}

            {/* Submit Button */}
            <div className="flex-row  mb-2">
              <button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                loading={values.loading}
                className="btn btn-block btn-primary rounded-full"
              >
                {values.loading ? "Saving..." : "Save & Continue"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CourseCreateForm;
